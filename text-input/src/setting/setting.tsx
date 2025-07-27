import { React, jsx } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { TextInput, Select, Option, Switch } from 'jimu-ui';
import { useState } from 'react';

const FONT_OPTIONS = [
  'Arial',
  'Georgia',
  'Courier New',
  'Times New Roman',
  'Verdana'
];

const Setting = (props: AllWidgetSettingProps<any>) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('fontFamily', e.target.value)
    });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('fontSize', e.target.value)
    });
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('placeholder', e.target.value)
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('showText', e.target.value)
    });
  };



  return (
    <div className="widget-settings" style={{ padding: '1rem' }}>
      <label>Font Family</label>
      <Select value={props.config.fontFamily || 'Arial'} onChange={handleFontChange}>
        {FONT_OPTIONS.map((font) => (
          <Option key={font} value={font}>
            {font}
          </Option>
        ))}
      </Select>

      <label style={{ marginTop: '1rem', display: 'block' }}>Font Size (px)</label>
      <TextInput
        type="number"
        value={props.config.fontSize || ''}
        onChange={handleFontSizeChange}
        placeholder="e.g. 16"
      />

      <label style={{ marginTop: '1rem', display: 'block' }}>Placeholder Text</label>
      <TextInput
        value={props.config.placeholder || ''}
        onChange={handlePlaceholderChange}
        placeholder="Enter placeholder text"
      />

      <label style={{ marginTop: '1rem', display: 'block' }}>Show Text</label>
      <TextInput
        value={props.config.showText || ''}
        onChange={handleTextChange}
        placeholder="Put 'No' if you want to hide"
      />
    </div>
  );
};

export default Setting;
