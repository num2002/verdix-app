<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);
$message = trim((string)($payload['message'] ?? ''));
$lang = ((string)($payload['lang'] ?? 'th')) === 'en' ? 'en' : 'th';
$history = is_array($payload['history'] ?? null) ? $payload['history'] : [];

if ($message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Missing message']);
    exit;
}

$privateDir = dirname(__DIR__, 2) . '/private';

$geminiKey = getenv('GEMINI_API_KEY') ?: getenv('GOOGLE_API_KEY') ?: '';
$geminiKeyFile = $privateDir . '/gemini.key';
if ($geminiKey === '' && is_readable($geminiKeyFile)) {
    $geminiKey = trim((string)file_get_contents($geminiKeyFile));
}

$openAiKey = getenv('OPENAI_API_KEY') ?: '';
$openAiKeyFile = $privateDir . '/openai.key';
if ($openAiKey === '' && is_readable($openAiKeyFile)) {
    $openAiKey = trim((string)file_get_contents($openAiKeyFile));
}

$system = $lang === 'th'
    ? 'คุณคือ VerdiX AI ผู้ช่วยภาษาไทยสำหรับเว็บไซต์ VerdiX Green ตอบสั้น กระชับ สุภาพ และเน้นเรื่อง Eco Factory, CFO, CFP, Carbon Footprint, ESG, Net Zero, IoT, MQTT, Sensor, PLC, Dashboard, รายงานสิ่งแวดล้อม และการดาวน์โหลดเอกสาร หากคำถามเป็นเรื่องการรับรองหรือกฎหมาย ให้แนะนำตรวจสอบกับผู้เชี่ยวชาญก่อนยื่นจริง'
    : 'You are VerdiX AI for the VerdiX Green website. Answer concisely and helpfully about Eco Factory, CFO, CFP, Carbon Footprint, ESG, Net Zero, IoT, MQTT, sensors, PLC, dashboards, environmental reporting, and document downloads. For certification or legal matters, advise verification with an expert.';

$input = [
    ['role' => 'developer', 'content' => $system],
];

foreach (array_slice($history, -8) as $item) {
    $role = ($item['role'] ?? '') === 'user' ? 'user' : 'assistant';
    $content = trim((string)($item['content'] ?? ''));
    if ($content !== '') {
        $input[] = ['role' => $role, 'content' => function_exists('mb_substr') ? mb_substr($content, 0, 1200) : substr($content, 0, 1200)];
    }
}

$input[] = ['role' => 'user', 'content' => $message];

if ($geminiKey !== '') {
    $contents = [];
    foreach (array_slice($history, -8) as $item) {
        $role = ($item['role'] ?? '') === 'user' ? 'user' : 'model';
        $content = trim((string)($item['content'] ?? ''));
        if ($content !== '') {
            $contents[] = [
                'role' => $role,
                'parts' => [[
                    'text' => function_exists('mb_substr') ? mb_substr($content, 0, 1200) : substr($content, 0, 1200)
                ]]
            ];
        }
    }
    $contents[] = ['role' => 'user', 'parts' => [['text' => $message]]];

    $model = getenv('GEMINI_MODEL') ?: 'gemini-2.5-flash';
    $body = json_encode([
        'systemInstruction' => [
            'parts' => [['text' => $system]]
        ],
        'contents' => $contents,
        'generationConfig' => [
            'maxOutputTokens' => 450,
            'temperature' => 0.4,
        ],
    ], JSON_UNESCAPED_UNICODE);

    $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode($model) . ':generateContent?key=' . rawurlencode($geminiKey);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false || $status < 200 || $status >= 300) {
        http_response_code(502);
        echo json_encode([
            'error' => 'Gemini request failed',
            'status' => $status,
            'detail' => $curlError ?: json_decode((string)$response, true),
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $data = json_decode($response, true);
    $reply = '';
    foreach (($data['candidates'][0]['content']['parts'] ?? []) as $part) {
        $reply .= (string)($part['text'] ?? '');
    }

    echo json_encode([
        'provider' => 'gemini',
        'reply' => trim($reply) ?: ($lang === 'th' ? 'ขออภัยครับ ระบบยังไม่สามารถสร้างคำตอบได้ในขณะนี้' : 'Sorry, I could not generate an answer right now.'),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($openAiKey === '') {
    http_response_code(503);
    echo json_encode(['error' => 'GEMINI_API_KEY or OPENAI_API_KEY is not configured']);
    exit;
}

$body = json_encode([
    'model' => getenv('OPENAI_MODEL') ?: 'gpt-4.1-mini',
    'input' => $input,
    'max_output_tokens' => 450,
], JSON_UNESCAPED_UNICODE);

$ch = curl_init('https://api.openai.com/v1/responses');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $openAiKey,
    ],
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
]);

$response = curl_exec($ch);
$status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    http_response_code(502);
    echo json_encode([
        'error' => 'OpenAI request failed',
        'status' => $status,
        'detail' => $curlError ?: json_decode((string)$response, true),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($response, true);
$reply = '';
foreach (($data['output'] ?? []) as $output) {
    foreach (($output['content'] ?? []) as $content) {
        if (($content['type'] ?? '') === 'output_text') {
            $reply .= (string)($content['text'] ?? '');
        }
    }
}

echo json_encode([
    'provider' => 'openai',
    'reply' => trim($reply) ?: ($lang === 'th' ? 'ขออภัยครับ ระบบยังไม่สามารถสร้างคำตอบได้ในขณะนี้' : 'Sorry, I could not generate an answer right now.'),
], JSON_UNESCAPED_UNICODE);
