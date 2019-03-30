import React from 'react'

const Button = (props: ButtonProps) => {
    return (
        <button>
            {props.children}
        </button>
    )
}

interface ButtonProps {
    children: string;
    type?: 'submit' | 'reset' | 'button';
}

export default Button
