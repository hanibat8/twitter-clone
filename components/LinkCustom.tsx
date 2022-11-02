import React from 'react'
import Link from 'next/link';

const LinkCustom = ({children,href,...props}) => {
  return (
    <Link href={href} {...props} passHref>
        <a {...props}>
            {children}
        </a>
    </Link>
  )
}

export default LinkCustom