<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de Historia Médica</title>
</head>
<body>
    <h1>Consulta de Historia Médica</h1>
    <label for="patientId">ID del Paciente:</label>
    <input type="text" id="patientId">
    <button onclick="consultarHistoria()">Consultar Historia Médica</button>

    <div id="resultado-historia"></div>

    <script src="js/historiaMedica.js"></script>
    <script>
        function consultarHistoria() {
            const patientId = document.getElementById("patientId").value;
            if (patientId) {
                obtenerHistoriaMedica(patientId);
            } else {
                alert("Por favor ingrese un ID de paciente.");
            }
        }
    </script>
</body>
</html>
