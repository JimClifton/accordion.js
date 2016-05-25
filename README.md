# accordion.js
An accordion plugin written in pure JS

Example markup:

    <section class="acc">
        <div class="acc__section">
            <header class="acc__header">
                <h2><a href="#section1" class="js-fc">Section 1</a></h2>
            </header>
            <div class="acc__content" id="section1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="acc__section">
            <header class="acc__header">
                <h2><a href="#section2" class="js-fc">Section 2</a></h2>
            </header>
            <div class="acc__content" id="section2">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="acc__section">
            <header class="acc__header">
                <h2><a href="#section3" class="js-fc">Section 3</a></h2>
            </header>
            <div class="acc__content" id="section3">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
    </section>


To initialise create a new instance:

    var acc = new Accordion({
        container: el,
        section: '.acc__section',
        sectionHeader: '.acc__header',
        sectionContent: '.acc__content',
        activeClass: 'is-active',
        mode: 'closed',
        active: 1
    });


Copy the following basic CSS to get the accordion functioning correctly:

    .js .acc__content {
        display: none;
    }
    
    .acc__section.is-active .acc__content {
        display: block;
    }

container '.acc'
section '.acc__section'
sectionHeader '.acc__header'
sectionContent '.acc__content'
activeClass 'is-active'
mode 'closed' --- Accepts 'open' and 'closed'. This determines how the accordion sections will function.
active 1 --- The section that is open by default. The URL hash(if specified) will override this. Leave empty quotes to have no active section on page load.

Features
- Two modes are available. Only one section open at a time or all sections can be opened.
- Aria attributes added for accessibility.
- The hash of a section can be passed in the URL and this will open the section by default.
- A specified section can be open by default.
- Written in raw Javascript, so it's nice and fast!
