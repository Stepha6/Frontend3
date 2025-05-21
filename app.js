// app.js
document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const familyName = document.getElementById('familyName').value;
    const gender = document.getElementById('gender').value;
    const birthDate = document.getElementById('birthDate').value;
    const identifierSystem = document.getElementById('identifierSystem').value;
    const identifierValue = document.getElementById('identifierValue').value;
    const cellPhone = document.getElementById('cellPhone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;

    // Medicamento
    const nameMedicine = document.getElementById('nameMedicine').value;
    const presentation = document.getElementById('presentation').value;
    const dose = document.getElementById('dose').value;
    const amount = document.getElementById('amount').value;
    const diagnosis = document.getElementById('disgnosis').value;
    const applicationDate = document.getElementById('applicationDate').value;

    // Datos prescripción
    const doctorName = document.getElementById('doctorName').value;
    const recipeDate = document.getElementById('recipeDate').value;
    const institution = document.getElementById('institution').value;

    // Observaciones
    const observations = document.getElementById('observations').value;

    // Crear objeto Patient
    const patient = {
        resourceType: "Patient",
        name: [{
            use: "official",
            given: [name],
            family: familyName
        }],
        gender: gender,
        birthDate: birthDate,
        identifier: [{
            system: identifierSystem,
            value: identifierValue
        }],
        telecom: [{
            system: "phone",
            value: cellPhone,
            use: "home"
        }, {
            system: "email",
            value: email,
            use: "home"
        }],
        address: [{
            use: "home",
            line: [address],
            city: city,
            postalCode: postalCode,
            country: "Colombia"
        }]
    };

    // Crear paciente y luego registrar la solicitud de medicamento
    fetch('https://backend3-ohrj.onrender.com/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
    .then(response => response.json())
    .then(data => {
        alert('✅ Paciente creado exitosamente');

        const patientId = data._id;

        // Crear MedicationRequest usando el ID del paciente
        const medicationRequest = {
            resourceType: "MedicationRequest",
            status: "active",
            intent: "order",
            medicationCodeableConcept: {
                text: nameMedicine,
                coding: [{
                    display: `${nameMedicine} - ${presentation}`
                }]
            },
            subject: {
                reference: `Patient/${patientId}`,
                display: `${name} ${familyName}`
            },
            requester: {
                reference: `Practitioner/${doctorName.replace(/\s+/g, '-')}`,
                display: doctorName
            },
            supportingInformation: [{
                reference: `Organization/${institution.replace(/\s+/g, '-')}`,
                display: institution
            }],
            authoredOn: recipeDate,
            dosageInstruction: [{
                text: dose,
                timing: {
                    event: [applicationDate]
                }
            }],
            quantity: {
                value: parseInt(amount),
                unit: "Unidades"
            },
            reasonCode: [{
                text: diagnosis
            }],
            note: [{
                text: observations || "Sin observaciones adicionales"
            }],
            substitution: {
                allowedBoolean: false
            }
        };

        fetch('https://backend3-ohrj.onrender.com/patient', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(patient)
})
.then(async response => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status} - ${text}`);
    }
    return response.json();
})
.then(data => {
    alert('✅ Paciente creado exitosamente');
    // Continuar con el siguiente paso
})
.catch((error) => {
    console.error('Error:', error);
    alert('❌ Hubo un error durante el proceso: ' + error.message);
});

