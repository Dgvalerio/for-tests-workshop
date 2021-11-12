import { AxiosResponse } from 'axios';

import api from '../utils/api';

/**
 * Example of Controller
 * @module GenericController
 * */
export class GenericController<Entity> {
  private readonly path: string;

  /**
   * Constructor of GenericController
   * @param {string} path - route to Generic on server rest.
   * */
  constructor(path: string) {
    this.path = path;
  }

  /**
   * Method to create a Generic
   * @param {Object} attributes - attributes of Generic.
   * @return {Object}
   * */
  public async create(attributes: Omit<Entity, 'id'>): Promise<Entity> {
    const { data }: AxiosResponse<{ name: string }> = await api.post(
      this.mountRoute(),
      {
        ...attributes,
      }
    );

    return this.show(data.name);
  }

  /**
   * Method to convert firebase node in a array of objects
   * @param {object} node - firebase node
   * @return {object[]}
   * */
  private static listAdapter<ObjectType>(node: object): ObjectType[] {
    return Object.entries(node).map(([id, attributes]) => ({
      id,
      ...attributes,
    }));
  }

  /**
   * Method to list a Generic
   * @return {[Object]}
   * */
  public async list(): Promise<Entity[]> {
    const { data }: AxiosResponse<Entity[]> = await api.get(this.mountRoute());

    return GenericController.listAdapter(data);
  }

  /**
   * Method to show a Generic
   * @param {string} id - id of Generic.
   * @return {Object}
   * */
  public async show(id: string): Promise<Entity> {
    const { data }: AxiosResponse<Entity> = await api.get(
      this.mountRoute(`/${id}`)
    );

    return { id, ...data };
  }

  /**
   * Method to update a Generic
   * @param {string} id - id of Generic.
   * @param {Object} attributes - attributes of Generic
   * @return {Object}
   * */
  public async update(
    id: string,
    attributes: Partial<Omit<Entity, 'id'>>
  ): Promise<Entity> {
    await api.patch(this.mountRoute(`/${id}`), { ...attributes });

    return this.show(id);
  }

  /**
   * Method to delete a Generic
   * @param {string} id - id of Generic.
   * @return {Object}
   * */
  public async delete(id: string): Promise<void> {
    await api.delete(this.mountRoute(`/${id}`));
  }

  /**
   * Method to mount route
   * @param {string} extra - extra value to route
   * @return {string}
   * */
  private mountRoute(extra?: string): string {
    return `${this.path}${extra || ''}.json`;
  }
}
