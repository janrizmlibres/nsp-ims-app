export const FormParts = Object.freeze({
  Identity: Symbol(0),
  Personal: Symbol(1),
  Contact: Symbol(2),
  Emergency: Symbol(3),
  Parental: Symbol(4),
  PrevSchool: Symbol(5)
})

export const floatLabelPt = {
  root: [
    'block relative',
    '[&>*:last-child]:text-surface-900/60 dark:[&>*:last-child]:text-white/60',
    '[&>*:last-child]:absolute',
    '[&>*:last-child]:-top-4',
    '[&>*:last-child]:-translate-y-1/2',
    '[&>*:last-child]:left-3',
    '[&>*:last-child]:pointer-events-none',
    '[&>*:last-child]:text-sm'
  ]
}
