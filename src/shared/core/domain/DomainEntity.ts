import { UniqueEntityID } from 'src/shared/core/domain/UniqueEntityID';

export interface DomainEntityProps {
  [index: string]: any;
}

export abstract class DomainEntity<Props extends DomainEntityProps> {
  protected readonly _id: UniqueEntityID;
  protected props: Props;

  protected constructor(props: Props, id: UniqueEntityID) {
    this._id = id;
    this.props = props;
  }

  public isNew(): boolean {
    return this._id.isNewIdentifier();
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get propsValue(): Props {
    return this.props;
  }

  public equals(other?: DomainEntity<Props>): boolean {
    return this.id.equals(other?.id);
  }
}
