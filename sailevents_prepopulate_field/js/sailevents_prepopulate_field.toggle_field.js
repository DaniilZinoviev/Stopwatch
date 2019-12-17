/**
 * @file
 */

(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.sailevents_prepopulate_field_toggle_field = {
    attach: function (context, settings) {
      $('.js-plan-destination-btn').once('appear').each(function() {
        let $target = $(this).closest('.field--type-geolocation').find('.geolocation-map-wrapper');
        console.log($target);
        $target.hide();
        $(this).on('click', function() {
          $target.show();
          $(this).hide();
        });
      });

      $('#field-plan-event-wrap').once('appear').each(function() {
        console.log($('#edit-field-participation-type').val(), 123);
        let $eventInfo = $('#field-plan-event-wrap .event-info');
        
        if ($('#edit-field-participation-type').val() !== 'event') {
          $eventInfo.hide();
        } else {
          $eventInfo.show();
        }

        $('#edit-field-participation-type').on('change', function() {
          if ($(this).val() !== 'event') {
            $eventInfo.hide();
          } else {
            $eventInfo.show();
          }
        });

      });
    }
  };

})(jQuery, Drupal, drupalSettings);
