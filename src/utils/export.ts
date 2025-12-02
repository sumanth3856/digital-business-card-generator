import { toPng, toJpeg, toCanvas } from 'html-to-image';
import jsPDF from 'jspdf';

export const downloadCard = async (elementId: string, format: 'png' | 'jpg' | 'pdf', fileName: string = 'digital-card') => {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    try {
        // Filter out elements that might cause issues (like the swift bird if it were inside, though it's fixed)
        const filter = (node: HTMLElement) => {
            const exclusionClasses = ['exclude-from-export'];
            return !exclusionClasses.some((classname) => node.classList?.contains(classname));
        };

        if (format === 'png') {
            const dataUrl = await toPng(element, { quality: 0.95, pixelRatio: 2, filter });
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = dataUrl;
            link.click();
        } else if (format === 'jpg') {
            const jpgUrl = await toJpeg(element, { quality: 0.95, pixelRatio: 2, filter, backgroundColor: '#ffffff' });
            const link = document.createElement('a');
            link.download = `${fileName}.jpg`;
            link.href = jpgUrl;
            link.click();
        } else if (format === 'pdf') {
            // Use toCanvas for PDF to have more control and potentially avoid some dataURL issues
            const canvas = await toCanvas(element, { quality: 0.95, pixelRatio: 2, filter });
            const imgData = canvas.toDataURL('image/png');

            if (!imgData || imgData === 'data:,') {
                throw new Error('Failed to generate image data for PDF');
            }

            const pdf = new jsPDF({
                orientation: element.offsetWidth > element.offsetHeight ? 'landscape' : 'portrait',
                unit: 'px',
                format: [element.offsetWidth, element.offsetHeight]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);

            // Add clickable links
            const links = element.querySelectorAll('a');
            const elementRect = element.getBoundingClientRect();

            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                    const rect = link.getBoundingClientRect();
                    const x = rect.left - elementRect.left;
                    const y = rect.top - elementRect.top;
                    const w = rect.width;
                    const h = rect.height;

                    pdf.link(x, y, w, h, { url: href });
                }
            });

            pdf.save(`${fileName}.pdf`);
        }
    } catch (error) {
        console.error('Export failed:', error);
        throw error;
    }
};
