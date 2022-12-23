import React from "react";
import { Button, View} from "react-native";
import { Root, Popup } from 'react-native-popup-confirm-toast'

import {addUserDonation} from "../redux/actions/userDonation";
import { DonationUserContext } from '../context/donationUserContext';

export default function confirmButton(props) {
    const {addDonation} = React.useContext(DonationUserContext);
    return (
        <Root>
            <View>
                <Button
                    title= {props.name}
                    color="#e10b0b"
                    onPress={() =>
                        Popup.show({
                            confirmButtonColor: '#e10b0b',
                            buttonStyle: {
                                backgroundColor: '#e10b0b',
                            },
                            type: 'confirm',
                            title: 'Confirmation!',
                            textBody: 'Are you sure you want to make this appointment?',
                            buttonText: 'Yes',
                            confirmText: 'Back',
                            // ça c'est ce qui se passe quand on appuie sur le bouton "yes"
                            callback: () => {
                                alert('You have made an appointment!');
                                addDonation(props.donation)
                                Popup.hide();
                            },
                            // ça c'est ce qui se passe quand on clique sur le bouton back
                            cancelCallback: () => {
                                alert('You pressed the back button');
                                Popup.hide();
                            },
                        })
                    }
                />
            </View>
        </Root>
    );
}
