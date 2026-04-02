import * as React from 'react'

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({ className = '', content = '', children, ...props }, ref) => (
  <div ref={ref} className={`relative group ${className}`} {...props}>
    {children}
    {content && (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap pointer-events-none z-50">
        {content}
      </div>
    )}
  </div>
))
Tooltip.displayName = 'Tooltip'

export { Tooltip }
