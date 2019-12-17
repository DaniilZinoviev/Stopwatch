/**
 * @file
 */

(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.sailevents_prepopulate_field_event_message = {
    attach: function (context, settings) {
      $('.node-plan-form, .node-plan-edit-form').once('appear').each(function() {

        let messageText = 'When you save this form, you will be redirected to the Events Map to select an event, or create a new event.';
        let hasMessage = !!$(this).parent().find('.js-event-message').length;
        let $participation_type = $(this).find('select[name="field_participation_type"]');
        let $event_select = $(this).find('select[name="field_plan_event"]');

        // Create message block
        let message = document.createElement('div');
        message.className = 'messages messages--status alert alert-primary js-event-message';
        message.innerHTML = messageText;

        if ($participation_type.val() === 'event' && $event_select.val() === '_none' && !hasMessage) {
          showMessage();
        }

        $participation_type.on('change', function() {
          if ($(this).val() === 'event' && $event_select.val() === '_none' && !hasMessage) {
            showMessage();
          } else if ($(this).val() !== 'event' && hasMessage) {
            hideMessage();
          }
        });

        $event_select.on('change', function() {
          if ($(this).val() === '_none' && $participation_type.val() === 'event' && !hasMessage) {
            showMessage();
          } else if ($(this).val() !== '_none') {
            hideMessage();
          }
        });

        function showMessage() {
          $participation_type.parent().append(message);
          hasMessage = true;
        }

        function hideMessage() {
          $participation_type.parent().find('.js-event-message').remove();
          hasMessage = false;
        }

      });
    }
  };

})(jQuery, Drupal, drupalSettings);
