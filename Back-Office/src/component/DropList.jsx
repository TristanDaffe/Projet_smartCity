import React, { useState } from 'react';
import Select from 'react-select';

function DropList () {
    const options = [
        { value: 'id', label: 'Id' },
        { value: 'date', label: 'Date' },
        { value: 'time', label: 'Time' },
        { value: 'donor', label: 'Donor' },
        { value: 'donationType', label: 'Donation type' },
        { value: 'bloodType', label: 'Blood type' },
        { value: 'donationCenter', label: 'Donation center' },
    ];
    const [userChoice, setUserChoice] = useState();
    return (
        <div>
            <Select
                value={userChoice}
                options={options}
                onChange={userChoice=>setUserChoice(userChoice.target.value)}
            />
        </div>
    );
}

export default DropList;