import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

export const downloadCard = async (elementId: string, format: 'png' | 'jpg' | 'pdf', fileName: string = 'digital-card') => {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    try {
        const dataUrl = await toPng(element, { quality: 0.95, pixelRatio: 2 });

        if (format === 'png') {
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = dataUrl;
            link.click();
        } else if (format === 'jpg') {
            const jpgUrl = await toJpeg(element, { quality: 0.95, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `${fileName}.jpg`;
            link.href = jpgUrl;
            link.click();
        } else if (format === 'pdf') {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [element.offsetWidth, element.offsetHeight]
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);
            pdf.save(`${fileName}.pdf`);
        }
    } catch (error) {
        console.error('Export failed:', error);
        throw error;
    }
};
