<?php
/**
 * Plugin Name:       InstaScaler - Get Traffic
 * Plugin URI:        https://instascaler.com/
 * Description:       InstaScaler helps you get high-quality traffic using A.I and marketing automation. Get guaranteed traffic with the push of a button.
 * Version:           1.0.0
 * Author:            Cognitev
 * Author URI:        https://cognitev.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       instawp
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'INSTASCALER_PLUGIN_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-instawp-activator.php
 */
function instawp_activate() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-instawp-activator.php';
	Instawp_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-instawp-deactivator.php
 */
function instawp_deactivate() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-instawp-deactivator.php';
	Instawp_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'instawp_activate' );
register_deactivation_hook( __FILE__, 'instawp_deactivate' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-instawp.php';

function instawp_menu() {
	add_menu_page('Instascaler', 'Instascaler' , 'manage_options', 'instawp-top-level-handle', 'instawp_dashboard', 'dashicons-admin-site' );
	add_submenu_page('instawp-top-level-handle', 'Support', 'Support', 'manage_options', 'instawp-contact-us-page', 'instawp_contact_page');
}

add_action( 'admin_menu', 'instawp_menu' );

function instawp_contact_page(){
	echo <<<EOF
	<p>
		Hello, We can help! Send us a message:
	</p>
	
	<p>
		<a href="mailto:hello@instascaler.com">hello@instascaler.com</a>
	</p>
EOF;
}

function instawp_dashboard() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}

	echo '<div class="page-container"></div>';
}

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function instawp_run() {

	$plugin = new Instawp();
	$plugin->run();

}

instawp_run();
