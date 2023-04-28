// import { copy } from './copy'

// TODO: verificar se existe problema de concorrência com esta classe. Caso positivo implementar trava.

export class State<T> {
  private state: T

  constructor(initialState: T) {
    this.state = initialState
  }

  public get() {
    return this.state
  }

  public set(newState: T) {
    this.state = newState
  }
}
