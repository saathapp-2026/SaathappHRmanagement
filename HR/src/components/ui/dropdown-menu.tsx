import React from 'react';

export const DropdownMenu = ({ children }: any) => <div>{children}</div>;
export const DropdownMenuTrigger = ({ children, asChild }: any) => <div>{children}</div>;
export const DropdownMenuContent = ({ children, align }: any) => <div>{children}</div>;
export const DropdownMenuItem = ({ children, onClick, className }: any) => <div onClick={onClick} className={className}>{children}</div>;
export const DropdownMenuLabel = ({ children }: any) => <div>{children}</div>;
export const DropdownMenuSeparator = () => <hr />;
