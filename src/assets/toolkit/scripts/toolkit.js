/**
 * Toolkit JavaScript
 */

'use strict';

var $ = require('jquery');

function CustomForm() {

  this.activateDropdown = function(e){
		console.log("Activate dropdown", $(e.target));
    if ($(e.target).closest('.dropdown').hasClass('on')) {
      $(e.target).closest('.dropdown').toggleClass('on');
    } else {
      $('.on').removeClass('on');
      $(e.target).closest('.dropdown').toggleClass('on');
    }
  };

  this.addEvents = function() {
    $('body').on('click', this.clearDropdowns);
    $('body').on('click', '.dropdown__selected-item, .dropdown__label', this.activateDropdown);
    $('input[type="radio"]+label, input[type="checkbox"]+label').on('click', this.syncInputSelections);
    $('select:not(.no-cf)').on('change', this.syncSelectToDropdown);
    $('.dropdown__list li').on('click', this.syncDropdownToSelect);
  };

  this.buildDropdown = function(i,o){
    let $dropdown = $('<div>').addClass('dropdown');
    let $current = $('<p>').addClass('dropdown__selected-item')
    let $list = $('<ul>').addClass('dropdown__list');
    let $selected = $(this).find('[selected="selected"]');
    if ($selected.length === 0) {
      $(this).find('option:first-of-type').each(function() { $(this).attr('selected', 'selected'); });
    }
    $(this).children('option').each(function(i,o) {
      let $item = $('<li>')
        .text($(this).text())
        .attr('data-value', $(this).val());
      if ($(this).attr('selected') === 'selected') {
        $item.addClass('selected');
        $current.text($(this).text());
      }
      $list.append($item)
    });
    $dropdown.append($current).append($list);
    $(this).after($dropdown);
  };

  this.clearDropdowns = function(e) {
    let $dropdown = $(e.target).closest('.dropdown');
    if ($dropdown.length === 0) {
      $('.on').removeClass('on');
    }
  };

  this.setupDropdowns = function() {
    $('select:not(.no-cf)').each(this.buildDropdown);
  };

  this.syncDropdownToSelect = function(e){
    let content = $(e.target).text();
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    $(this).closest('.dropdown').find('.dropdown__selected-item').text(content);
    $(this).closest('.dropdown')
      .removeClass('on')
      .siblings('select').each(function(i,o) {
        $(this).children().each(function(i,o) {
          $(this).removeAttr('selected');
          if ($(this).text() === content) {
            $(this).attr('selected', 'selected');
          }
        });
      });
  };

  this.syncInputSelections = function(e){
    $(e.target).siblings('input').each(function(i,o){
      if ($(this).attr('type') === 'checkbox') {
        if ($(this).attr('checked') === 'checked') {
          $(this).removeAttr('checked');
        } else {
          $(this).attr('checked', 'checked');
        }
      } else {
        $('input[name="' + $(this).attr('name') + '"]').each(function(i,o) {
          $(this).removeAttr('checked');
        });
        $(this).attr('checked', 'checked');
      }
    });
  };

  this.syncSelectToDropdown = function(i,o) {
    let selectedValue = $(this).val();
    $(this).find('[selected="selected"]').removeAttr('selected');
    $(this).children().each(function(i,o){
      if ($(this).val() === selectedValue) {
        $(this).attr('selected', 'selected');
      }
    });
    $(this).siblings('.dropdown').each(function(i,o) {
      let $current = $(this).find('.dropdown__selected-item');
      $(this).find('.selected').removeClass('selected');
      $(this).find('.dropdown__list').children().each(function(i,o) {
        if ($(this).attr('data-value') === selectedValue) {
          $(this).addClass('selected');
          $current.text($(this).text());
        }
      });
    });
  };

  this.initialize = function() {
    this.setupDropdowns();
    this.addEvents();
  };
}

function Blurrable() {
  this.initialize = function() {
    $(".blurrable").each(function(i,o){
      let $this = $(o);
      let $box = $this.find(".blurrable__box");
      let $copy = $box.clone();
      let $layover = $this.find(".blurrable__layover");
      let $blur = $("<div/>");
      $box.css("min-height", $layover.outerHeight());
      $copy.removeClass("blurrable__box")
        .addClass("blurrable__box--copy")
        .height($box.outerHeight())
        .width($box.width());
      $blur.html($copy)
        .addClass("blurrable__blur")
        .height($layover.outerHeight());
      $this.append($blur);
    });
  };
}

$(function() {
  let cf = new CustomForm();
  cf.initialize();
  // let blrbl = new Blurrable();
  // blrbl.initialize();
});
