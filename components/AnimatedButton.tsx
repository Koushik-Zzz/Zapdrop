import React from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    type?: "button" | "submit" | "reset";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = "default",
  size = "lg",
  type = "button"
}) => {

    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-reflect button-reflect rounded-lg font-semibold shadow backdrop-blur-sm transition-all hover:shadow-lg"
  
    const variantClasses = {
        default: "bg-[rgb(162,59,103)] hover:bg-[#d56698] active:bg-[rgb(162,59,103)] disabled:hover:bg-[rgb(162,59,103)] disabled:active:bg-[rgb(162,59,103)] dark:bg-primary/20 dark:hover:bg-pink-800/70 dark:active:bg-pink-800/40 disabled:dark:hover:bg-primary/20 disabled:dark:active:bg-primary/20 text-white",
        outline: "bg-transparent border border-muted hover:bg-muted/10 text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
    }

    const sizeClasses = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-8 text-lg",
        icon: "h-10 w-10"
    }

  return (
    <Button 
      className={cn(
        baseClasses, 
        variantClasses[variant], 
        sizeClasses[size],
        className
      )} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  )
}

export default AnimatedButton