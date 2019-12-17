<?php 

namespace Drupal\sailevents_prepopulate_field\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 *	Defines a form that configures sailevents module settings 
 */
class SaileventsSettingsForm extends ConfigFormBase {

	/**
	 * {@inheritdoc}
	 */
	public function getFormId() {
		return 'sailevents_prepopulate_field_settings';
	}

	/**
	 * {@inheritdoc}
	 */
	protected function getEditableConfigNames() {
		return [
			'sailevents_prepopulate_field.settings',
		];
	}

	/**
	 * {@inheritdoc}
	 */
	public function buildform(array $form, FormStateInterface $form_state) {
		$config = $this->config('sailevents_prepopulate_field.settings');
		$active_celeb = null;
		$celeb_nid = $config->get('active_celebration_id');

		if (gettype($celeb_nid) !== 'NULL') {
			$active_celeb = \Drupal::entityTypeManager()->getStorage('node')->load($celeb_nid);
		}

		$form['active_celebration_id'] = [
			'#type' => 'entity_autocomplete',
			'#target_type' => 'node',
			// '#selection_handler' => 'views',
			'#selection_settings' => [
				'target_bundles' => ["celebration"],
			// 	'view' => [
			// 		'view_name' => 'celebrations_list',
	  	//     'display_name' => 'entity_reference_1',
	  	//     'arguments' => [],
			// 	],
			// 	'match_operator' => 'CONTAINS',
			],
			'#title' => $this->t('Active celebration'),
			'#default_value' => $active_celeb,
			'#description' => $this->t('Set here default active celebration, which will be used as default value for reference fields.')
		];

		return parent::buildForm($form, $form_state);
	}

	/**
	 * {@inheritdoc}
	 */
	public function validateForm(array &$form, FormStateInterface $form_state) {
		parent::validateForm($form, $form_state);
	}

	/**
	 * {@inheritdoc}
	 */
	public function submitForm(array &$form, FormStateInterface $form_state) {
		$this->config('sailevents_prepopulate_field.settings')
			->set('active_celebration_id', $form_state->getValue('active_celebration_id'))
			// ->set('active_celebration_id', null)
			->save();

		parent::submitForm($form, $form_state);
	}

}
