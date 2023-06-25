export interface IPrice {
  name: string,
  snapshotDate: string,
  price: string,
  marketCap: string,
  totalVolume: string,
  open?: string,
  close?: string,
  high?: string,
  low?: string
}


export class Bnb implements IPrice {
  constructor(
    public name: string,
    public snapshotDate: string,
    public price: string,
    public marketCap: string,
    public totalVolume: string
  ) {}
}

export class Eth implements IPrice {
  constructor(
    public name: string,
    public snapshotDate: string,
    public price: string,
    public marketCap: string,
    public totalVolume: string
  ) {}

}

export class Btc implements IPrice {
  constructor(
    public name: string,
    public snapshotDate: string,
    public price: string,
    public marketCap: string,
    public totalVolume: string
  ) {}

}