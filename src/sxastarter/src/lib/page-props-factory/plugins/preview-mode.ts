import { editingDataService } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';

class PreviewModePlugin implements Plugin {
  order = 0;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context.preview) return props;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // if (context.preview && typeof window === undefined) {

    // console.log('MODULE...........................', m);
    // }

    const data = editingDataService().getEditingData(context.previewData);

    if (!data) {
      throw new Error(
        `Unable to get editing data for preview ${JSON.stringify(context.previewData)}`
      );
    }
    props.locale = data.language;
    props.layoutData = data.layoutData;
    props.dictionary = data.dictionary;

    return props;
  }
}

export const previewModePlugin = new PreviewModePlugin();
