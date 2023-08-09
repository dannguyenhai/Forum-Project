import React, { ComponentPropsWithoutRef, FC } from 'react'

export enum ButtonType {
  Primary = 'primary',
  Secodnary = 'secodnary',
  Outline = 'outline'
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  buttonType?: ButtonType
  icon?: React.ReactNode
  title?: string
  className?: string
  classname?: string
  titleClassName?: string
}

export const Button: FC<ButtonProps> = ({
  buttonType = ButtonType.Primary,
  icon,
  title,
  className,
  titleClassName,
  ...rest
}) => {
  const containerClass =
    buttonType === ButtonType.Primary
      ? 'bg-primary'
      : buttonType === ButtonType.Secodnary
      ? 'bg-[#D9D9D9] border border-grey-border-dark'
      : 'bg-white border border-grey-border-dark'
  const titleClass = buttonType === ButtonType.Primary ? 'text-white' : 'text-black'

  return (
    <button className={`flex items-center gap-3 px-[18px] py-2.5 ${containerClass} ${className}`} {...rest}>
      {icon}
      <p className={`text-[14px] ${titleClass} ${titleClassName}`}>{title}</p>
    </button>
  )
}
