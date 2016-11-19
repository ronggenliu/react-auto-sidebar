"use strict";

import React, { Component } from 'react';
import tweener from "./utils/tweener";
const TWEEN = require('tween.js');
import "./sidebar.css";

class SideBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hover: false,
            translate: -230,
            active: 0,
        };

        this._animateSidebar = this._animateSidebar.bind(this);
        this._activate = this._activate.bind(this);
        this._hoverIn = this._hoverIn.bind(this);
        this._hoverOut = this._hoverOut.bind(this);
    }

    _animateSidebar(target) {
        let dimensions = { translate: this.state.translate };
        this.setState({ hover: !this.state.hover });

        let update = (t) => {
            this.setState({ translate: t });
        };

        const tween = tweener(dimensions, target, 500)
            .easing(TWEEN.Easing.Quartic.Out)
            .onUpdate(function () {
                update(this.translate);
            })
            .start();
    }

    _hoverIn() {
        this._animateSidebar({ translate: 0 });
    }

    _hoverOut() {
        this._animateSidebar({ translate: -230 });
    }

    _activate(i) {
        this.setState({ active: i });
    }

    componentDidUpdate() {
        document.getElementById("slide-right").style.transform =
            "translate(" + this.state.translate + "px, 0px)";
    }

    render() {
        return (
            <div className="sidebar"
                id="slide-right"
                onMouseEnter={this._hoverIn}
                onMouseLeave={this._hoverOut}
                >
                <div className="item">test</div>

            </div>
        );
    }
}

export default SideBar;