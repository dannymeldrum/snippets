<?php

////////////////////////////////////////
// TINY MCE FUNCTIONS 
////////////////////////////////////////

function fb_mce_editor_buttons( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
add_filter( 'mce_buttons_2', 'fb_mce_editor_buttons' );




// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {  
	// Define the style_formats array
	$style_formats = array(  

		array(  
			'title' => 'Featured Paragraph',  
            'selector' => 'p',
			'classes' => 'featured-paragraph'
		),
        array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'btn'
        ),
        array(
            'title' => 'Two Column List',
            'selector' => 'ul',
            'classes' => 'two-column-list'
        ),
        array(
            'title' => 'Small Text',
            'selector' => 'p',
            'classes' => 'small-text'
        ),
        array(
            'title' => 'No border image',
            'selector' => 'img',
            'classes' => 'no-shadow'
        ),
        array(
            'title' => 'No green border image',
            'selector' => 'img',
            'classes' => 'no-green'
        )

	);  

	$init_array['style_formats'] = json_encode( $style_formats );  	
	return $init_array;
}
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );  


