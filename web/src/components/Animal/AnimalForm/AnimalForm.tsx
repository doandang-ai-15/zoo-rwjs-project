import type { EditAnimalById, UpdateAnimalInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormAnimal = NonNullable<EditAnimalById['animal']>

interface AnimalFormProps {
  animal?: EditAnimalById['animal']
  onSave: (data: UpdateAnimalInput, id?: FormAnimal['id']) => void
  error: RWGqlError
  loading: boolean
}

const AnimalForm = (props: AnimalFormProps) => {
  const onSubmit = (data: FormAnimal) => {
    props.onSave(data, props?.animal?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAnimal> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.animal?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="zooId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Zoo id
        </Label>

        <NumberField
          name="zooId"
          defaultValue={props.animal?.zooId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="zooId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AnimalForm
