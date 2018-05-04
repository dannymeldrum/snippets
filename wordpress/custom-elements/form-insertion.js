(function() {
    tinymce.PluginManager.add('custom_elements_mce_button', function(editor, url) {
        editor.addButton('custom_elements_mce_button', {
            icon: false,
            text: "Custom Elements",
            onclick: function() {
                editor.windowManager.open({
                    title: "Insert Custom Element",
                    body: [{
                        type   : 'listbox',
                        name   : 'form_insert',
                        label  : 'Custom Element Insertion',
                        values : [
                            { text: 'Find Local Store Link', value: 'example_name_of_element' }
                        ],
                        value : 'default' // Sets the default
                    }],
                    onsubmit: function(e) {
                        editor.insertContent(
                            '[custom_element type="' +
                            e.data.form_insert + 
                            '"]'
                        );
                    }
                });
            }
        });
    });
})();

