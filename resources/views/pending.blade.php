<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagamento Pendente</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .pending-icon {
            font-size: 2rem;
            color: #f39c12;
            margin-bottom: 1rem;
        }
        .pending-message {
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }
        .pending-description {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 2rem;
        }
        .btn {
            background-color: #007bff;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="pending-icon">⏳</div>
        <div class="pending-message">Pagamento Pendente</div>
        <div class="pending-description">Seu pagamento está em processamento. Por favor verifique mais tarde.</div>
        <a href="{{ url('/') }}" class="btn">Ok</a>
    </div>
</body>
</html>
