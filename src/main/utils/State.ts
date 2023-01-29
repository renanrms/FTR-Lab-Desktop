import { copy } from './copy'

// TODO: verificar se existe problema de concorrência com esta classe. Caso positivo implementar trava.

export class State<T> {
  private state: T

  constructor(initialState: T) {
    this.state = copy(initialState)
  }

  public get() {
    return copy(this.state)
  }

  public set(newState: T) {
    this.state = copy(newState)
  }
}
