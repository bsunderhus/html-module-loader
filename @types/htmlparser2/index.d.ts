import 'domutils'
import { DomElement } from 'domhandler'

declare module 'domutils' {
  export function filter(
    test: (element: DomElement) => unknown,
    element: DomElement | DomElement[],
    recurse: boolean,
    limit?: number
  ): DomElement[]
}
