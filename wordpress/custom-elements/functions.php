<?php


function custom_elements_mce_button() {
	// Check if user have permission
	if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
	  return;
	}
	// Check if WYSIWYG is enabled
	if ( 'true' == get_user_option( 'rich_editing' ) ) {
	  add_filter( 'mce_external_plugins', 'custom_elements_tinymce_plugin' );
	  add_filter( 'mce_buttons', 'register_custom_elements_mce_button' );
	}
  }
add_action('admin_head', 'custom_elements_mce_button');






// CHANGE THIS TO THE LOCATION OF THE JS FILE
function custom_elements_tinymce_plugin( $plugin_array ) {
	$plugin_array['custom_elements_mce_button'] = get_template_directory_uri() .'/assets/js/form-insertion.js';
	return $plugin_array;
}

function register_custom_elements_mce_button( $buttons ) {
    array_push( $buttons, 'custom_elements_mce_button' );
    return $buttons;
}






function custom_element_shortcode( $atts ) {
    $a = shortcode_atts( array(
        'type' => false,
    ), $atts );

	if($a['type'] && $a['type'] == 'example_name_of_element') {
		$html_string = '<p class="featured-link featured-link__store">Find a location</a></p>';
		return $html_string;
	} else {
		return '';
	}
}

add_shortcode( 'custom_element', 'custom_element_shortcode' );
