import { FC } from 'react';
import { ButtonType } from '@/types';
import { CustomButton } from '@/components';
import Link from 'next/link';

type TextBlockProps = {
  title?: string;
  titleStyle?: string;
  text: string;
  textStyle?: string;
  buttonTheme?: ButtonType;
  buttonTitle: string;
  link?: string;
};
export const TextBlock: FC<TextBlockProps> = ({
  title,
  titleStyle,
  text,
  textStyle,
  buttonTheme,
  buttonTitle,
  link,
}) => {
  const Block = link ? (
    <Link href={link}>
      <CustomButton theme={buttonTheme}>
        <p>{buttonTitle}</p>
      </CustomButton>
    </Link>
  ) : (
    <CustomButton theme={buttonTheme}>
      <p>{buttonTitle}</p>
    </CustomButton>
  );

  return (
    <div>
      {title && <h2 className={`${titleStyle}`}>{title}</h2>}
      <p className={`${textStyle}`}>{text}</p>
      {Block}
    </div>
  );
};
