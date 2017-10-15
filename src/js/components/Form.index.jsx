import React, { Component } from 'react';
import IonIcons from 'react-ionicons';
import axios from 'axios';

const classNames = require('classnames');

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: undefined
        };

        this.checkGender = this.checkGender.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.keyPress = this.keyPress.bind(this);

        this.name = '';
    }

    componentDidUpdate() {
        console.log(this.state.gender);
    }

    checkGender() {
        const root = `https://api.genderize.io`;
        axios
            .get(`${root}`, {
                params: {
                    name: this.name
                }
            })
            .then(res => {
                this.setState({ gender: res.data.gender });
            });
    }

    updateInputValue(e) {
        if (!e.target.value) {
            this.setState({ gender: undefined });
        }
        this.name = e.target.value;
    }

    keyPress(e) {
        if (e.key === 'Enter') {
            this.checkGender();
        }
    }

    render() {
        const maleActive = classNames({
            card__icons: true,
            active: this.state.gender == 'male'
        });
        const femaleActive = classNames({
            card__icons: true,
            active: this.state.gender == 'female'
        });

        return (
            <div className="content">
                <div className="card">
                    <span>
                        <label className="card__label" htmlFor="name">
                            Name
                        </label>
                        <br />
                        <input
                            className="card__name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            onChange={e => this.updateInputValue(e)}
                            onKeyPress={e => this.keyPress(e)}
                        />
                    </span>
                    <div className="card__body">
                        <span>
                            <label className="card__label" htmlFor="">
                                Gender
                            </label>
                            <br />
                            <IonIcons className={maleActive} icon="ion-male" />
                            <IonIcons
                                className={femaleActive}
                                icon="ion-female"
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
