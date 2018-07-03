/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import {IronOverlayBehavior, IronOverlayBehaviorImpl} from '../iron-overlay-behavior.js';

Polymer({
  _template: html`
    <style>
      :host {
        background: white;
        color: black;
        border: 1px solid black;
      }

      :host([animated]) {
        -webkit-transition: -webkit-transform 0.3s;
        transition: transform 0.3s;
        -webkit-transform: translateY(300px);
        transform: translateY(300px);
      }

      :host(.opened[animated]) {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
      }
    </style>

    <slot></slot>
`,

  is: 'test-overlay',
  properties: {animated: {type: Boolean, reflectToAttribute: true}},
  behaviors: [IronOverlayBehavior],
  listeners: {'transitionend': '__onTransitionEnd'},

  _renderOpened: function() {
    if (this.animated) {
      if (this.withBackdrop) {
        this.backdropElement.open();
      }
      this.classList.add('opened');
      this.fire('simple-overlay-open-animation-start');
    } else {
      IronOverlayBehaviorImpl._renderOpened.apply(this, arguments);
    }
  },

  _renderClosed: function() {
    if (this.animated) {
      if (this.withBackdrop) {
        this.backdropElement.close();
      }
      this.classList.remove('opened');
      this.fire('simple-overlay-close-animation-start');
    } else {
      IronOverlayBehaviorImpl._renderClosed.apply(this, arguments);
    }
  },

  __onTransitionEnd: function(e) {
    if (e && e.target === this) {
      if (this.opened) {
        this._finishRenderOpened();
      } else {
        this._finishRenderClosed();
      }
    }
  }
});
