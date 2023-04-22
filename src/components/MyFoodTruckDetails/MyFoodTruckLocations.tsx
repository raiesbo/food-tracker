import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Location } from "@prisma/client";
import { useState } from "react";
import { InfoSection } from "../InfoSection";
import styles from './MyFoodTruckLocations.module.scss';

type Props = {
    location: Location
}

export default function MyFoodTruckLocations({ location }: Props) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isUpdate, setIsUpdate ] = useState(false);

    const [ streetName, setStreetName ] = useState(location.streetName || '');
    const [ streetNumber, setStreetNumber ] = useState(location.streetNumber || '');
    const [ city, setCity ] = useState(location.city || '');
    const [ country, setCountry ] = useState(location.country || '');
    const [ zip, setZip ] = useState(location.zip || '');

    const onCancel = () => {
        setStreetName(location.streetName || '');
        setStreetNumber(location.streetNumber || '');
        setCity(location.city || '');
        setCountry(location.country || '');
        setZip(location.zip || '');

        setIsUpdate(false);
    };

    const onSave = () => {
        setIsLoading(true);

        fetch(`/api/locations/${location.id}`, {
            method: 'PUT',
            body: JSON.stringify({ streetName, streetNumber, city, country, zip })
        }).then(response => {
            if (!response.ok) {
                onCancel();
                alert('Server Error');
            }
        }).finally(() => {
            setIsLoading(false);
            setIsUpdate(false);
        });
    };

    return (
        <InfoSection title="Main Location">
            {!location?.id ? (
                "Unfortunatelly there are no existing locations"
            ) : (
                <div className={styles.inputList}>
                    <TextField
                        disabled={!isUpdate || isLoading}
                        value={streetName}
                        label='Street Name'
                        onChange={(e) => setStreetName(e.target.value)}
                        fullWidth
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        disabled={!isUpdate || isLoading}
                        value={streetNumber}
                        label='Street Number'
                        onChange={(e) => setStreetNumber(e.target.value)}
                        fullWidth
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        disabled={!isUpdate || isLoading}
                        value={city}
                        label='City'
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        disabled={!isUpdate || isLoading}
                        value={zip}
                        label='Post Code'
                        onChange={(e) => setZip(e.target.value)}
                        fullWidth
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        disabled={!isUpdate || isLoading}
                        value={country}
                        label='Country'
                        onChange={(e) => setCountry(e.target.value)}
                        fullWidth
                        sx={{ backgroundColor: 'white' }}
                    />
                    <div className={styles.buttonContainer}>
                        {isUpdate ? (
                            <>
                                <Button variant="outlined" onClick={onCancel} color='error'>
                                    Cancel
                                </Button>
                                <Button variant="outlined" onClick={onSave} color='success'>
                                    Save
                                </Button>
                            </>
                        ) : (
                            <Button variant="outlined" onClick={() => setIsUpdate(true)}>
                                Update
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </InfoSection>
    );
}
