import { describe, it, expect } from 'vitest';
import { templates, getTemplate } from './template-registry';

describe('Template Registry', () => {
    it('should have all expected templates', () => {
        const expectedTemplates = [
            'neoMinimalist',
            'corporateElite',
            'artisticSoul',
            'cyberFuture'
        ];

        expectedTemplates.forEach(id => {
            expect(templates).toHaveProperty(id);
            expect(templates[id].id).toBe(id);
            expect(templates[id].component).toBeDefined();
        });
    });

    it('getTemplate should return correct template', () => {
        const template = getTemplate('corporateElite');
        expect(template.id).toBe('corporateElite');
    });

    it('getTemplate should return default (neoMinimalist) for unknown id', () => {
        const template = getTemplate('unknown-id');
        expect(template.id).toBe('neoMinimalist');
    });
});
