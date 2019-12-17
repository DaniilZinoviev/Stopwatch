<?php 

namespace Drupal\sailevents_prepopulate_field\Form;

use Drupal\node\Entity\Node;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 *	Defines a form that display button to Join an Event, on Event's page
 */
class JoinEventForm extends FormBase {

	public function getFormId() {
		return 'sailevents_prepopulate_field_join_event';
	}

	public function buildForm(array $form, FormStateInterface $form_state, $parameter = NULL) {
		if (!is_null($parameter)) {
			$form_state->set('event_id', $parameter['event_id']);
			$form_state->set('event_name', $parameter['event_name']);
			$form_state->set('celeb_id', $parameter['celeb_id']);
		}
		
		$form['submit'] = [
			'#type' => 'submit',
			'#value' => $this->t('Join this Event'),
		];

		return $form;
	}

	public function validateForm(array &$form, FormStateInterface $form_state) {
		parent::validateForm($form, $form_state);
	}

	public function submitForm(array &$form, FormStateInterface $form_state) {
		// User plan for this celebration should receive this event.
		$event_id = $form_state->get('event_id');
		$event_name = $form_state->get('event_name');
		$celeb_id = $form_state->get('celeb_id');
		$user = \Drupal::currentUser();

		$user_plans = \Drupal::entityQuery('node')
      ->condition('uid', $user->id())
      ->condition('type', 'plan')
      ->condition('status', 1)
      ->condition('field_plan_celebration', $celeb_id)
      ->execute();

    if (!empty($user_plans)) {
    	// Update user Plan
    	$user_plan_nid = array_values($user_plans)[0];
	    $user_plan = \Drupal::entityTypeManager()->getStorage('node')->load($user_plan_nid);

	    if (!is_null($user_plan)) {
	    	$user_plan->set('field_participation_type', 'event');
	    	$user_plan->set('field_plan_event', $event_id);
	    	$user_plan->save();
	    }

    	drupal_set_message(t('You are now registered for '.$event_name.'.'), 'status');

    } else {
    	// Create Plan to user
	    $celeb_node = \Drupal::entityTypeManager()->getStorage('node')->load($celeb_id);

    	if (!is_null($celeb_node)) {
		    $shortcode = $celeb_node->get('field_celebration_short_code')->getString();
		  } else {
		    $shortcode = 'No celebration';
		  }

    	$new_plan = Node::create([
        'type' => 'plan',
        'title' => $shortcode.' - '.$user->getDisplayName(),
        'moderation_state' => [
           'target_id' => 'published',
         ],
        'uid' => $user->id(),
        'field_plan_details' => 'New plan.',
        'field_participation_type' => 'event',
        'field_plan_celebration' => $celeb_id,
        'field_plan_event' => $event_id,
      ]);

      $new_plan->save();

    	drupal_set_message(t('You are now registered for '.$event_name.'.'), 'status');
    }


	}

}