import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  offset,
  safePolygon,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react'
import { useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
}

export default function Popover({ children, renderPopover }: Props) {
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate
  })
  const hover = useHover(context, { handleClose: safePolygon() })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>

      {isOpen && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            {/* renderPopover */}
            {renderPopover}
            <FloatingArrow ref={arrowRef} context={context} width={30} height={15} fill='white' />
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
