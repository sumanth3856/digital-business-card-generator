import { describe, it, expect } from 'vitest';
import { templates, getTemplate } from './template-registry';

describe('Template Registry', () => {
    it('should have all expected templates', () => {
        const expectedTemplates = [
            'creative',
            'executive',
            'minimalistPro',
            'architect',
            'vogue',
            'horizon',
            'bloom',
            'midnight',
            'swiss',
            'abstract',
            'tech'
        ];

        expectedTemplates.forEach(id => {
            expect(templates).toHaveProperty(id);
            expect(templates[id].id).toBe(id);
            expect(templates[id].component).toBeDefined();
        });
    });

    it('getTemplate should return correct template', () => {
        const template = getTemplate('executive');
        expect(template.id).toBe('executive');
    });

    it('getTemplate should return default (creative) for unknown id', () => {
        const template = getTemplate('unknown-id');
        expect(template.id).toBe('creative');
    });
});
