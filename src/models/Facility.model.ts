export type FacilityData = {
  address?: string
  breadth?: string
  depart?: string
  district?: string
  img?: string
  isserviced?: boolean
  kinds?: string
  length?: string
  pollution?: string
  spotname?: string
}

export enum CommandType {
  spot = 'spot',
  using = 'using'
}
