import React from 'react';
export const Switch = ({ checked, onCheckedChange, id }: any) => <input type="checkbox" id={id} checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />;
