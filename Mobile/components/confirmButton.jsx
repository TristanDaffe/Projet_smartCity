import React from "react";
import { Button, View} from "react-native";
import { Root, Popup } from 'react-native-popup-confirm-toast'
import Spinner from "react-native-loading-spinner-overlay/lib";

import { DonationUserContext } from '../context/donationUserContext';

export default function confirmButton(props) {
    const {addDonation, isLoading} = React.useContext(DonationUserContext);
    return (
        <Root>
            <Spinner visible = {isLoading}/>
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
<<<<<<< HEAD
                            callback: () => {
                                alert('You have made an appointment!');
                                addDonation(props.donation)
=======
                            // ça c'est ce qui se passe quand on appuie sur le bouton "yes"
                            callback: async() => {
                                await addDonation(props.donation);
>>>>>>> c2fd559e691218378371d67266429aff9daa2de2
                                Popup.hide();
                            },
                            cancelCallback: () => {
                                Popup.hide();
                            },
                        })
                    }
                />
            </View>
        </Root>
    );
}
