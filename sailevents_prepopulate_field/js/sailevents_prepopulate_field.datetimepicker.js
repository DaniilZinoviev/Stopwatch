/**
 * @file
 */

(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.sailevents_prepopulate_field_datetimepicker = {
    attach: function (context, settings) {
      $('.field--name-field-date input').datetimepicker({
        format:'m/d/Y h:i A',
        formatDate: 'm/d/Y',
        formatTime: 'h:i A',
        step: 30,
        todayButton: true,
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
