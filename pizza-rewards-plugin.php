<?php
/**
 * Plugin Name: Pizza Rewards System
 * Plugin URI: https://example.com/pizza-rewards
 * Description: A rewards system for pizza restaurants
 * Version: 1.0
 * Author: Your Name
 * Author URI: https://example.com
 */

// ... (keep the existing code)

// REST API endpoints
function pizza_rewards_register_api_routes() {
    // ... (keep existing routes)

    register_rest_route('pizza-rewards/v1', '/stores', array(
        'methods' => 'GET',
        'callback' => 'pizza_rewards_get_stores',
        'permission_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));
}
add_action('rest_api_init', 'pizza_rewards_register_api_routes');

// ... (keep existing functions)

function pizza_rewards_get_stores($request) {
    $stores = get_option('pizza_rewards_stores', array());
    return new WP_REST_Response($stores, 200);
}

// Add a function to create some sample stores if none exist
function pizza_rewards_create_sample_stores() {
    $existing_stores = get_option('pizza_rewards_stores', array());
    
    if (empty($existing_stores)) {
        $sample_stores = array(
            array('id' => 1, 'name' => 'Downtown Pizzeria'),
            array('id' => 2, 'name' => 'Uptown Pizza Palace'),
            array('id' => 3, 'name' => 'Suburban Slice Haven')
        );
        
        update_option('pizza_rewards_stores', $sample_stores);
    }
}
register_activation_hook(__FILE__, 'pizza_rewards_create_sample_stores');

// ... (keep the rest of the existing code)