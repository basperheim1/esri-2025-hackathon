import { React, jsx } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { TextInput } from 'jimu-ui';


const Setting = (props: AllWidgetSettingProps<any>) => {

    const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onSettingChange({
            id: props.id,
            config: props.config.set('delay', e.target.value)
        });
    };

    const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onSettingChange({
            id: props.id,
            config: props.config.set('buttonText', e.target.value)
        });
    };


    return (
        <div className="widget-settings" style={{ padding: '1rem' }}>
            <label style={{ marginTop: '1rem', display: 'block' }}>Delay (ms)</label>
            <TextInput
                type="number"
                value={props.config.delay || ''}
                onChange={handleDelayChange}
                placeholder="e.g. 2000"
            />
            <label style={{ marginTop: '1rem', display: 'block' }}>Button Text</label>
            <TextInput
                value={props.config.buttonText || ''}
                onChange={handlePlaceholderChange}
                placeholder="Enter button text"
            />
        </div>
    );
};

export default Setting;
