import React from 'react'
import jsPDF from 'jspdf';
import { useState } from 'react';
import { useEffect } from 'react';
import Papa from "papaparse";
import autoTable from 'jspdf-autotable';

export function FormPdf() {
    const [data, setData] = useState([]);
    const [tipoheroe, setTipoHeroe] = useState("Fighter");
    const [dificultad, setDificultad] = useState("1");

    useEffect(() => {
        fetch("../champions.csv")
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => setData(result.data),
                });
            });
    }, []);

    const handleDificultad = (e) => {
        setDificultad(e.target.value);
        console.log(dificultad)
    };

    const handleTipoHeroe = (e) => {
        setTipoHeroe(e.target.value);
        console.log(tipoheroe)
    };

    const filteredData = data.filter(
        (row) =>
            row.herotype?.includes(tipoheroe) &&
            row.difficulty?.includes(dificultad)
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text("Campeones", 105, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.text("Campeones de tipo " + tipoheroe + " de dificultad " + dificultad, 15, 30);

        // Extraer columnas y filas de los datos filtrados
        const columns = data.length > 0 ? Object.keys(data[0]) : [];
        const rows = filteredData.map((row) => columns.map((col) => row[col]));

        if (filteredData.length === 0) {
            alert("No hay campeones que coincidan con dificultad "+ dificultad + " y de tipo "+ tipoheroe+".");
            return;
        }


        // Agregar una fila de footer con el total de filas
        const footerRow = new Array(columns.length).fill("");
        footerRow[0] = 'Total de héroes: ' + filteredData.length;

        // Agregar tabla al PDF
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            foot: [footerRow], // Pie de página con el total
            footStyles: { fontStyle: "bold" }, // Alinear a la derecha y negrita
            theme: 'grid',
            styles: {
                textColor: "black",
                lineColor: "black",
                lineWidth: 0.1,
                fontSize: 12
            },
            headStyles: {
                fillColor: "green",
                textColor: "white"
            },
            bodyStyles: {
                textColor: "black"
            },
            alternateRowStyles: {
                fillColor: "gray"
            },
            

        });
        
        doc.setFontSize(12);
        doc.text(`Estos son el heroes de tipo ${tipoheroe} con dificultad ${dificultad}, tenemos ${filteredData.length} heroes con esas caracteristicas.`, 105, 220, { align: 'center' });

        // Guardar o mostrar PDF
        doc.save("campeones.pdf");

    }



    return (
        <div className="container text-start">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Dificultad</label>
                    <select onChange={handleDificultad} className="form-select" aria-label="Default select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Tipo de héroe</label>
                    <select onChange={handleTipoHeroe} className="form-select" aria-label="Default select example">
                        <option value="Fighter">Fighter</option>
                        <option value="Mage">Mage</option>
                        <option value="Assassin">Assassin</option>
                        <option value="Marksman">Marksman</option>
                        <option value="Tank">Tank</option>
                        <option value="Support">Support</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>

        </div>

    );
}

export default FormPdf;