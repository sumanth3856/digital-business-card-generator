import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadCard } from './export';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

// Mock html-to-image
vi.mock('html-to-image', () => ({
    toPng: vi.fn(),
    toJpeg: vi.fn(),
}));

// Mock jspdf
vi.mock('jspdf', () => {
    const MockJsPDF = vi.fn();
    MockJsPDF.prototype.addImage = vi.fn();
    MockJsPDF.prototype.save = vi.fn();
    return { default: MockJsPDF };
});

describe('downloadCard', () => {
    let element: HTMLElement;

    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();

        // Setup DOM element
        document.body.innerHTML = '<div id="test-card">Card Content</div>';
        element = document.getElementById('test-card')!;

        // Mock offsetWidth/Height
        Object.defineProperty(element, 'offsetWidth', { value: 500 });
        Object.defineProperty(element, 'offsetHeight', { value: 300 });
    });

    it('should throw error if element not found', async () => {
        await expect(downloadCard('non-existent-id', 'png')).rejects.toThrow('Element not found');
    });

    it('should download PNG', async () => {
        const mockDataUrl = 'data:image/png;base64,test';
        vi.spyOn(htmlToImage, 'toPng').mockResolvedValue(mockDataUrl);

        // Mock anchor click
        const clickSpy = vi.fn();
        const linkSpy = vi.spyOn(document, 'createElement').mockReturnValue({
            click: clickSpy,
            download: '',
            href: '',
        } as unknown as HTMLAnchorElement);

        await downloadCard('test-card', 'png', 'my-card');

        expect(htmlToImage.toPng).toHaveBeenCalledWith(element, expect.any(Object));
        expect(linkSpy).toHaveBeenCalledWith('a');
        expect(clickSpy).toHaveBeenCalled();
    });

    it('should download JPG', async () => {
        const mockDataUrl = 'data:image/jpeg;base64,test';
        vi.spyOn(htmlToImage, 'toJpeg').mockResolvedValue(mockDataUrl);

        // Mock anchor click
        const clickSpy = vi.fn();
        const linkSpy = vi.spyOn(document, 'createElement').mockReturnValue({
            click: clickSpy,
            download: '',
            href: '',
        } as unknown as HTMLAnchorElement);

        await downloadCard('test-card', 'jpg', 'my-card');

        expect(htmlToImage.toJpeg).toHaveBeenCalledWith(element, expect.any(Object));
        expect(linkSpy).toHaveBeenCalledWith('a');
        expect(clickSpy).toHaveBeenCalled();
    });

    it('should download PDF', async () => {
        const mockDataUrl = 'data:image/png;base64,test';
        vi.spyOn(htmlToImage, 'toPng').mockResolvedValue(mockDataUrl);

        await downloadCard('test-card', 'pdf', 'my-card');

        expect(htmlToImage.toPng).toHaveBeenCalled(); // PDF uses PNG first
        expect(jsPDF).toHaveBeenCalled();
    });
});
