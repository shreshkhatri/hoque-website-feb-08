import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('country_faqs')
      .select('*')
      .eq('country_id', id)
      .order('display_order', { ascending: true })

    if (error) throw error
    return NextResponse.json({ items: data || [] })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const countryId = parseInt((await params).id)
    const body = await request.json()

    if (!Array.isArray(body.items)) {
      return NextResponse.json({ error: 'Items array is required' }, { status: 400 })
    }

    const { error: deleteError } = await supabase
      .from('country_faqs')
      .delete()
      .eq('country_id', countryId)

    if (deleteError) throw deleteError

    if (body.items.length > 0) {
      const insertData = body.items.map((item: any, index: number) => ({
        country_id: countryId,
        question: item.question,
        answer: item.answer,
        display_order: index + 1,
      }))

      const { error: insertError } = await supabase
        .from('country_faqs')
        .insert(insertData)

      if (insertError) throw insertError
    }

    const { data } = await supabase
      .from('country_faqs')
      .select('*')
      .eq('country_id', countryId)
      .order('display_order', { ascending: true })

    return NextResponse.json({ items: data || [] })
  } catch (error) {
    console.error('Error updating FAQs:', error)
    return NextResponse.json({ error: 'Failed to update FAQs' }, { status: 500 })
  }
}
