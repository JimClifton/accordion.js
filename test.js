/*
 * Example usage for RequireJS
 */
define([
    'components/Accordion'
], function( Accordion ) {
    var AccordionTest = function( el ) {

        var acc = new Accordion({
            container: el,
            section: '.acc__section',
            sectionHeader: '.acc__header',
            sectionContent: '.acc__content',
            mode: 'closed',
            active: 1
        });

    };

    return AccordionTest;
});
